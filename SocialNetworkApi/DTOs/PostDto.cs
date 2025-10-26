namespace SocialNetworkApi.DTOs
{
    public class PostDto
    {
        public int Id { get; set; }
        public required string Content { get; set; } // obrigatório
        public DateTime CreatedAt { get; set; }
        public required UserDto User { get; set; } // obrigatório
        public List<CommentDto> Comments { get; set; } = new(); // já inicializa vazio
    }
}
