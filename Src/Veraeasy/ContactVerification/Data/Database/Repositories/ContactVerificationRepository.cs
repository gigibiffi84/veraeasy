using Microsoft.EntityFrameworkCore;
using Veraeasy.ContactVerification.Domain;

namespace Veraeasy.ContactVerification.Data.Database.Reporitories;

internal sealed class ContactVerificationRepository(
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

    public Task<List<ContactVerification>> ListByEmail(string search,
        CancellationToken cancellationToken = default)
    {
        return persistence.ContactEntries.Include(c => c.Events)
            .Where(q => q.EmailHash.Contains(search)).ToListAsync(cancellationToken);
    }

    public Task<List<ContactVerification>> ListByBusinessId(string search,
        CancellationToken cancellationToken = default)
    {
        return persistence.ContactEntries.Include(c => c.Events)
            .Where(q => q.BusinessId.Contains(search)).ToListAsync(cancellationToken);
    }

    public Task<List<ContactVerification>> ListByMobileNumber(string search,
        CancellationToken cancellationToken = default)
    {
        return persistence.ContactEntries.Include(c => c.Events)
            .Where(q => q.MobileNumberHash.Contains(search)).ToListAsync(cancellationToken);
    }

    public Task<List<ContactVerification>> ListByPersonId(string search,
        CancellationToken cancellationToken = default)
    {
        return persistence.ContactEntries.Include(c => c.Events)
            .Where(q => q.PersonId.Contains(search)).ToListAsync(cancellationToken);
    }
}