namespace SocialNetworkApi.DTOs
{
    public class CommentDto
    {
        public int Id { get; set; }
        public required string Text { get; set; } // obrigatório
        public DateTime CreatedAt { get; set; }
        public int PostId { get; set; }
        public required UserDto User { get; set; } // obrigatório
    }
}
