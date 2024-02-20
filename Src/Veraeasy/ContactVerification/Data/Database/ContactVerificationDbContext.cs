namespace Veraeasy.ContactVerification.Data.Database;

using Microsoft.EntityFrameworkCore;

internal sealed class ContactVerificationDbContext(DbContextOptions<ContactVerificationDbContext> options) : DbContext(options)
{
    private const string Schema = "ContactVerification";

    public DbSet<ContactVerification> ContactEntries => Set<ContactVerification>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema(Schema);
        modelBuilder.ApplyConfiguration(new ContactVerificationEntityConfiguration());
    }
}
