class Company < ActiveRecord::Base
  has_many :users
  has_many :invitations, class_name: "Invitation"
  has_one :attachment_status
  def self.find_by_lowercase_name(name)
    where("lower(name) = ?", name.downcase).first
  end
end
