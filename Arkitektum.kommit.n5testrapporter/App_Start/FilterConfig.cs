using System.Web;
using System.Web.Mvc;

namespace Arkitektum.kommit.n5testrapporter
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
