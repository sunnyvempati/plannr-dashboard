class CommentsController < ApplicationController
  before_action :find_commentable
  before_action :find_comment, only: :destroy

  def index
    render_success @commentable.comments.includes(:commenter).order("created_at desc")
  end

  def create
    created_comment = @commentable.comments.create!(comment_params)
    render_success created_comment
  end

  def destroy
    render_success if @comment.destroy
  end

  private

  def comment_params
    params.require(:comment).permit(:body).merge(commenter: current_user)
  end

  def find_commentable
    klass = params[:commentable_type].capitalize.constantize
    @commentable = klass.find(params[:commentable_id])
  end

  def find_comment
    @comment = Comment.find(params[:id])
  end
end