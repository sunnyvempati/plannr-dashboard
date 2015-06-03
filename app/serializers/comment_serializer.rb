class CommentSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper
  attributes :id, :body, :user_name, :time

  def user_name
    object.commenter.profile.full_name
  end

  def time
    time_ago_in_words(object.created_at)
  end
end