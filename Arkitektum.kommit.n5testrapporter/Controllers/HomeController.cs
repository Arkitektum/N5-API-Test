﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Arkitektum.kommit.n5testrapporter.Controllers
{
    public class HomeController : Controller
    {
        

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Index()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Index2(string rootApiUrl)
        {
            ViewBag.Message = "Test page.";
            if (!string.IsNullOrWhiteSpace(rootApiUrl))
            {
                Session["rootApiUrl"] = rootApiUrl;
            }
            return View();
        }
    }
}