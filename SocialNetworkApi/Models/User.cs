using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SocialNetworkApi.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [JsonIgnore]
        public ICollection<Post>? Posts { get; set; }

        [JsonIgnore]
        public ICollection<Comment>? Comments { get; set; }
    }
}
