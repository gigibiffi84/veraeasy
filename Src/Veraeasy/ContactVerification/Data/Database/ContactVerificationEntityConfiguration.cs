namespace Veraeasy.ContactVerification.Data.Database;

using System.Runtime.InteropServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Veraeasy.ContactVerification.Data;

internal sealed class ContactVerificationEntityConfiguration : IEntityTypeConfiguration<ContactVerification>
{
    public void Configure(EntityTypeBuilder<ContactVerification> builder)
    {
        builder.ToTable("ContactVerification");
        builder.HasKey(cv => cv.Id);
        builder.Property(cv => cv.CreatedAt).IsRequired();
        builder.Property(cv => cv.EmailHash).IsRequired();
        builder.Property(cv => cv.MobileNumberHash).IsRequired();
        builder.Property(cv => cv.ExpireAt).IsRequired();
    }
}