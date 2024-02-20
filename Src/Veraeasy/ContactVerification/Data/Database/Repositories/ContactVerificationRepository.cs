namespace Veraeasy.ContactVerification.Data.Database.Reporitories;

using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

internal sealed class ContactVerificationRepository(ContactVerificationDbContext persistence) : IContactVerificationRepository
{
    public async Task AddAsync(ContactVerification c, CancellationToken cancellationToken = default)
    {
        await persistence.ContactEntries.AddAsync(c, cancellationToken);
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
}
