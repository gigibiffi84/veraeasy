using Microsoft.EntityFrameworkCore;

namespace Veraeasy.Verifier.Data.Database;

internal sealed class EmailVerificationDbContext(DbContextOptions<EmailVerificationDbContext> options)
    : DbContext(options)
{
    private const string Schema = "public";

    public DbSet<EmailVerificationProjection> Emails => Set<EmailVerificationProjection>();
    public DbSet<EmailVerifierEvent> VerifiedEvents => Set<EmailVerifierEvent>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema(Schema);
        modelBuilder.ApplyConfiguration(new EmailVerificationEntityConfiguration());
        modelBuilder.ApplyConfiguration(new EmailVerifiedEntityConfiguration());
    }
}