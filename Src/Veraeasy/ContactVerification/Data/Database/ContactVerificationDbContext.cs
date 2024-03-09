using Microsoft.EntityFrameworkCore;

namespace Veraeasy.ContactVerification.Data.Database;

internal sealed class ContactVerificationDbContext(DbContextOptions<ContactVerificationDbContext> options)
    : DbContext(options)
{
    private const string Schema = "ContactVerification";

    public DbSet<ContactVerification> ContactEntries => Set<ContactVerification>();
    //public DbSet<ContactVerificationEvent> ContactEvents => Set<ContactVerificationEvent>();


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema(Schema);
        modelBuilder.ApplyConfiguration(new ContactVerificationEntityConfiguration());
    }
}