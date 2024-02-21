namespace Veraeasy.ContactVerification.Data.Database.Reporitories;

using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Veraeasy.ContactVerification.Domain;

internal sealed class ContactVerificationRepository(IContactVerificationAggregate aggregate, ContactVerificationDbContext persistence) : IContactVerificationRepository
{
    public async Task AddAsync(ContactVerification c, CancellationToken cancellationToken = default)
    {

        await persistence.ContactEntries.AddAsync(c, cancellationToken);
        if (persistence.ChangeTracker.HasChanges())
        {
            var insertedEntity = persistence.ChangeTracker.Entries<ContactVerification>().Where(e => e.State == EntityState.Added);
            var found = insertedEntity.FirstOrDefault(f=>f is not null)?.Entity;
            aggregate.ContactVerificationAdded(new ContactVerificationAddedChange{
               VerificationId =  found.Id
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
        return await persistence.ContactEntries.FindAsync([id], cancellationToken: cancellationToken);
    }

    public async Task<IAsyncEnumerable<ContactVerification>> ListByOwnerAsync(string owner, CancellationToken cancellationToken = default)
    {
        return persistence.ContactEntries.Where(c => c.Owner.ToLower().Equals(owner)).AsAsyncEnumerable();

    }
}
