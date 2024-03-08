using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Veraeasy.Verifier.Data.Database;

public class EmailVerifiedEntityConfiguration : IEntityTypeConfiguration<EmailVerifierEvent>
{
    public void Configure(EntityTypeBuilder<EmailVerifierEvent> builder)
    {
        builder.HasKey(cv => cv.Id);
        builder.ToTable("email_verified_event");
        builder.Property(cv => cv.EmailAddress).IsRequired();
        builder.Property(cv => cv.EmailVerificationUuid).IsRequired();
    }
}