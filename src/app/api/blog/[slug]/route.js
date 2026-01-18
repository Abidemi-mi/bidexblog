const { Post } = require("@/app/lib/models")
const { connectToDb } = require("@/app/lib/utils")
const { NextResponse } = require("next/server")

export const GET = async (request, {params}) => {
    const {slug} = await params;
    try {
         connectToDb()
        const post = await Post.findOne({slug})

        return NextResponse.json(post);
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch post!")
        
    }
}

export const DELETE = async (request, { params }) => {
  const { slug } = params;

  try {
    connectToDb();

    await Post.deleteOne({ slug });
    return NextResponse.json("Post deleted");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete post!");
  }
};