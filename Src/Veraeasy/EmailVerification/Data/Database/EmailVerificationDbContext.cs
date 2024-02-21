namespace Veraeasy.EmailVerification.Data.Database;

using Microsoft.EntityFrameworkCore;

internal sealed class EmailVerificationDbContext(DbContextOptions<EmailVerificationDbContext> options) : DbContext(options)
{
    private const string Schema = "ContactVerification";

    public DbSet<EmailVerificationEntity> Emails => Set<EmailVerificationEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema(Schema);
        modelBuilder.ApplyConfiguration(new EmailVerificationEntityConfiguration());
    }
}
