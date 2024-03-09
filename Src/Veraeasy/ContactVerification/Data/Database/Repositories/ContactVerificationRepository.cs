using Microsoft.EntityFrameworkCore;
using Veraeasy.ContactVerification.Domain;
using Veraeasy.ContactVerification.Domain.Model;

namespace Veraeasy.ContactVerification.Data.Database.Reporitories;

internal sealed class ContactVerificationRepository(
    ILogger<ContactVerificationRepository> logger,
    IContactVerificationAggregate aggregate,
    ContactVerificationDbContext persistence) : IContactVerificationRepository
{
    public async Task AddAsync(ContactVerification c, CancellationToken cancellationToken = default)
    {
        await persistence.ContactEntries.AddAsync(c, cancellationToken);
        if (persistence.ChangeTracker.HasChanges())
        {
            var insertedEntity = persistence.ChangeTracker.Entries<ContactVerification>()
                .Where(e => e.State == EntityState.Added);
            var found = insertedEntity.FirstOrDefault(f => f is not null)?.Entity;
            aggregate.ContactVerificationAdded(new ContactVerificationAddedChange
            {
                VerificationId = found.Id
            });
        }

        Console.WriteLine(persistence.ChangeTracker.DebugView.LongView);

        //aggregate.ContactVerificationAdded()
        await persistence.SaveChangesAsync();
    }

    public async Task CommitAsync(CancellationToken cancellationToken = default)
    {
        await persistence.SaveChangesAsync();
    }

    public async Task<ContactVerification?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await persistence.ContactEntries.Include(c => c.Events)
            .FirstOrDefaultAsync();
    }

    public Task<IAsyncEnumerable<ContactVerification>> ListByOwnerAsync(string owner,
        CancellationToken cancellationToken = default)
    {
        return Task.FromResult(persistence.ContactEntries.Include(c => c.Events)
            .Where(c => c.Owner.ToLower().Equals(owner))
            .AsAsyncEnumerable());
    }

    public async Task<List<ContactVerification>> ListBySearchTermAsync(string search,
        CancellationToken cancellationToken = default)
    {
        var l = await ListByEmail(search, cancellationToken);
        var contactVerifications = l.Concat(await ListByBusinessId(search, cancellationToken))
            .Concat(await ListByMobileNumber(search, cancellationToken))
            .Concat(await ListByPersonId(search, cancellationToken));
        return contactVerifications.ToList();
    }

    public async Task<ContactVerification?> GetByIdWithoutEventsAsync(Guid id,
        CancellationToken cancellationToken = default)
    {
        return await persistence.ContactEntries.FindAsync([id]);
    }

    public async Task UpdateContactVerificationAsync(Guid contactId, ContactVerificationUpdate cv,
        CancellationToken cancellationToken = default)
    {
        var found = persistence.ContactEntries.Single(
            contactVerification => contactVerification.Id.Equals(contactId));
        logger.LogInformation($"found entity to update {found.Id}");
        found.BusinessId = cv.BusinessId;
        found.EmailHash = cv.Email;
        found.PersonId = cv.PersonId;
        found.MobileNumberHash = cv.MobileNumber;

        if (persistence.ChangeTracker.HasChanges())
        {
            var updated = persistence.ChangeTracker.Entries<ContactVerification>()
                .Where(e => e.State == EntityState.Modified);
            var modified = updated.FirstOrDefault(f => f is not null)?.Entity;
            if (modified != null)
                await persistence.AddAsync(ContactVerificationEvent.Updated(Guid.NewGuid(), modified.Id,
                    cv.BusinessId, cv.Owner, cv.PersonId, DateTimeOffset.UtcNow), cancellationToken);

            /*aggregate.ContactVerificationAdded(new ContactVerificationAddedChange
            {
                VerificationId = modified.Id
            });*/
        }


        await persistence.SaveChangesAsync(cancellationToken);
    }

    private Task<List<ContactVerification>> ListByEmail(string search,
        CancellationToken cancellationToken = default)
    {
        return persistence.ContactEntries.Include(c => c.Events)
            .Where(q => q.EmailHash.Contains(search)).ToListAsync(cancellationToken);
    }

    private Task<List<ContactVerification>> ListByBusinessId(string search,
        CancellationToken cancellationToken = default)
    {
        return persistence.ContactEntries.Include(c => c.Events)
            .Where(q => q.BusinessId.Contains(search)).ToListAsync(cancellationToken);
    }

    private Task<List<ContactVerification>> ListByMobileNumber(string search,
        CancellationToken cancellationToken = default)
    {
        return persistence.ContactEntries.Include(c => c.Events)
            .Where(q => q.MobileNumberHash.Contains(search)).ToListAsync(cancellationToken);
    }

    private Task<List<ContactVerification>> ListByPersonId(string search,
        CancellationToken cancellationToken = default)
    {
        return persistence.ContactEntries.Include(c => c.Events)
            .Where(q => q.PersonId.Contains(search)).ToListAsync(cancellationToken);
    }
}