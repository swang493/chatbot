using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Hackathon.Function
{
    public class chatbot
    {
        private readonly ILogger<chatbot> _logger;

        public chatbot(ILogger<chatbot> logger)
        {
            _logger = logger;
        }

        [Function("chatbot")]
        public IActionResult Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequest req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");
            return new OkObjectResult("Welcome to Azure Functions!");
        }
    }
}
