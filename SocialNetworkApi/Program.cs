using Microsoft.EntityFrameworkCore;
using SocialNetworkApi.Data;
using SocialNetworkApi.Models;
using SocialNetworkApi.DTOs;
using BCrypt.Net;

var builder = WebApplication.CreateBuilder(args);

// Configuração do banco MySQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

var app = builder.Build();

app.MapGet("/", () => "API Social Network Online!");

// Registrar usuário
app.MapPost("/register", async (AppDbContext db, User user) =>
{
    user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
    db.Users.Add(user);
    await db.SaveChangesAsync();

    return Results.Created($"/users/{user.Id}", new UserDto
    {
        Id = user.Id,
        Username = user.Username!
    });
});

// Listar usuários
app.MapGet("/users", async (AppDbContext db) =>
{
    var users = await db.Users.ToListAsync();
    return Results.Ok(users.Select(u => new UserDto
    {
        Id = u.Id,
        Username = u.Username!
    }).ToList());
});

// Criar post
app.MapPost("/posts", async (AppDbContext db, Post post) =>
{
    db.Posts.Add(post);
    await db.SaveChangesAsync();

    await db.Entry(post).Reference(p => p.User!).LoadAsync(); // garante que User está carregado

    return Results.Created($"/posts/{post.Id}", new PostDto
    {
        Id = post.Id,
        Content = post.Content!,
        CreatedAt = post.CreatedAt,
        User = new UserDto
        {
            Id = post.User!.Id,
            Username = post.User.Username!
        },
        Comments = new List<CommentDto>()
    });
});

// Listar posts
app.MapGet("/posts", async (AppDbContext db) =>
{
    var posts = await db.Posts
        .Include(p => p.User!)
        .Include(p => p.Comments!)
        .ThenInclude(c => c.User!)
        .ToListAsync();

    var postDtos = posts.Select(p => new PostDto
    {
        Id = p.Id,
        Content = p.Content!,
        CreatedAt = p.CreatedAt,
        User = new UserDto
        {
            Id = p.User!.Id,
            Username = p.User.Username!
        },
        Comments = p.Comments!.Select(c => new CommentDto
        {
            Id = c.Id,
            Text = c.Text!,
            CreatedAt = c.CreatedAt,
            PostId = c.PostId,
            User = new UserDto
            {
                Id = c.User!.Id,
                Username = c.User.Username!
            }
        }).ToList()
    }).ToList();

    return Results.Ok(postDtos);
});

// Criar comentário
app.MapPost("/comments", async (AppDbContext db, Comment comment) =>
{
    db.Comments.Add(comment);
    await db.SaveChangesAsync();

    await db.Entry(comment).Reference(c => c.User!).LoadAsync(); // garante que User está carregado

    return Results.Created($"/comments/{comment.Id}", new CommentDto
    {
        Id = comment.Id,
        Text = comment.Text!,
        CreatedAt = comment.CreatedAt,
        PostId = comment.PostId,
        User = new UserDto
        {
            Id = comment.User!.Id,
            Username = comment.User.Username!
        }
    });
});

// Listar comentários
app.MapGet("/comments", async (AppDbContext db) =>
{
    var comments = await db.Comments
        .Include(c => c.User!)
        .Include(c => c.Post!)
        .ToListAsync();

    var commentDtos = comments.Select(c => new CommentDto
    {
        Id = c.Id,
        Text = c.Text!,
        CreatedAt = c.CreatedAt,
        PostId = c.PostId,
        User = new UserDto
        {
            Id = c.User!.Id,
            Username = c.User.Username!
        }
    }).ToList();

    return Results.Ok(commentDtos);
});

app.Run();
