namespace Veraeasy.EmailVerification.Data.Database;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


internal sealed class EmailVerificationEntityConfiguration : IEntityTypeConfiguration<EmailVerificationEntity>
{
    public void Configure(EntityTypeBuilder<EmailVerificationEntity> builder)
    {
        builder.ToTable("EmailVerification");
        builder.HasKey(cv => cv.Id);
        builder.Property(cv => cv.CreatedAt).IsRequired();
        builder.Property(cv => cv.EmailAddress).IsRequired();
        builder.Property(cv => cv.Otp).IsRequired();
        builder.Property(cv => cv.AuthToken).IsRequired();
        builder.Property(cv => cv.Verified).IsRequired();
    }
}