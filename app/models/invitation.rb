class Invitation < ActiveRecord::Base
  before_create :generate_token

  belongs_to :sender, class_name: "User"
  belongs_to :recipient, class_name: "User"
  belongs_to :company

  validate :user_cannot_exist, on: :create

  validates :email, uniqueness: { scope: :company, message: "already invited"}

  def generate_token
    self.token = Digest::SHA1.hexdigest([self.company_id, Time.now, rand].join)
  end

  def user_cannot_exist
    errors.add(:email, "is already a user of Plannr") if self.email && User.find_by_email(self.email)
  end
end
