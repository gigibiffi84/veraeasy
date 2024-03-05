using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Veraeasy.Verifier.EmailVerification.Data.Database;

internal sealed class EmailVerificationEntityConfiguration : IEntityTypeConfiguration<EmailVerificationProjection>
{
    public void Configure(EntityTypeBuilder<EmailVerificationProjection> builder)
    {
        //builder.ToView("EmailVerificationProjection");
        //builder.HasKey(cv => cv.Id);
        builder.HasNoKey();
        builder.Property(cv => cv.CreatedAt).IsRequired();
        builder.Property(cv => cv.EmailAddress).IsRequired();
        builder.Property(cv => cv.Otp).IsRequired();
        builder.Property(cv => cv.AuthToken).IsRequired();
    }
}