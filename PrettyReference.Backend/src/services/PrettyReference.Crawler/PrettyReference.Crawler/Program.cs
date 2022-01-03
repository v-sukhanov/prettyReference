using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace PrettyReference.Crawler
{
    class Program
    {
        static async Task Main(string[] args)
        {
            try
            {
                var config = new ConfigurationBuilder()
                    .AddEnvironmentVariables()
                    .Build();
                var services = new ServiceCollection();

                Log.Logger = new LoggerConfiguration()
                    .Enrich.WithProperty("APP", "PRETTY-REFERENCE-CRAWLER")
                    .WriteTo.Console(restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Information)
                    .MinimumLevel.Debug()
                    .MinimumLevel.Override("Microsoft", Serilog.Events.LogEventLevel.Warning)
                    .MinimumLevel.Override("IdentityServer4", Serilog.Events.LogEventLevel.Error)
                    .WriteTo.Seq("http://seq:5341", Serilog.Events.LogEventLevel.Information)
                    .CreateLogger();
                services.AddLogging(l => l.AddSerilog());

                Log.Information("Starting");
                var host = new AppServiceHost(services, config);
                await host.Start();
                Log.Information("Started");
                Console.ReadLine();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Crashed");
                Log.CloseAndFlush();
            }
        }

    }
}