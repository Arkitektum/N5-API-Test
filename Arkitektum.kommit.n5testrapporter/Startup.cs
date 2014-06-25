using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Arkitektum.kommit.n5testrapporter.Startup))]
namespace Arkitektum.kommit.n5testrapporter
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
