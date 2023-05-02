var postType = new GraphqlObjectType({
    name: 'Post',
    fields: {
        body: { type: GraphQLString 
        type: GraphqlQueryString,
        resolve: (post, args, context, { rootValue }) => {
            //return post.body if user is authorized to view post
            //return null if user is not authorized to view post
            if(context.iser&&context.user.id===post.authorId){
                return post.body
            }
                return null
            }
        }
    }
});
      