using Nelibur.ObjectMapper;
using Veraeasy.ContactVerification.Controller;
using Veraeasy.ContactVerification.Data.Database;
using Veraeasy.ContactVerification.Domain;
using Veraeasy.ContactVerification.Domain.Model;
using Veraeasy.ContactVerification.Domain.Service;
using Veraeasy.ContactVerification.Infrastructure;

namespace Veraeasy.ContactVerification;

internal static class ContactVerificationModule
{
    internal static IServiceCollection AddContactVerification(this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDatabase(configuration);
        services.AddContactVerificationAggregateModule();
        services.AddScoped<ContactVerficationQueryController>();
        services.AddScoped<IContactVerificationAggregate, ContactVerificationAggregate>();
        services.AddScoped<IContactVerificationQueryService, ContactVerificationQueryService>();
        AddMapper();
        return services;
    }

    internal static void AddMapper()
    {
        TinyMapper.Bind<Data.ContactVerification, ContactVerificationStatus>(config =>
        {
            config.Ignore(x => x.Events);
            config.Bind(source => source.BusinessId, target => target.BusinessId);
            config.Bind(source => source.CreatedAt, target => target.CreatedAt);
            config.Bind(source => source.PersonId, target => target.PersonId);
        });

        TinyMapper.Bind<Data.ContactVerification, ContactVerificationAddress>(config =>
        {
            config.Ignore(x => x.Events);
            config.Ignore(x => x.BusinessId);
            config.Ignore(x => x.CreatedAt);
            config.Ignore(x => x.PersonId);
            config.Bind(source => source.EmailHash, target => target.Email);
            config.Bind(source => source.Id, target => target.Id);
        });
    }

    internal static IApplicationBuilder UseContactVerification(this IApplicationBuilder applicationBuilder)
    {
        applicationBuilder.UseDatabase();

        return applicationBuilder;
    }
}