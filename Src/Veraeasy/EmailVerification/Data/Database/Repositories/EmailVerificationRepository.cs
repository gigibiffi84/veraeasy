namespace Veraeasy.EmailVerification.Data.Database.Repositories;

using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

internal sealed class EmailVerificationRepository(EmailVerificationDbContext persistence) : IEmailVerificationRepository
{
    public async Task AddAsync(EmailVerificationEntity e, CancellationToken cancellationToken = default)
    {

        await persistence.Emails.AddAsync(e, cancellationToken);
        await persistence.SaveChangesAsync();
    }

    public async Task CommitAsync(CancellationToken cancellationToken = default)
    {
        await persistence.SaveChangesAsync();

    }

    public async Task<EmailVerificationEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await persistence.Emails.FindAsync([id], cancellationToken: cancellationToken);
    }

     public async Task Update(EmailVerificationEntity e, CancellationToken cancellationToken = default)
    {

        await persistence.Emails.AddAsync(e, cancellationToken);
        await persistence.SaveChangesAsync();
    }


}
