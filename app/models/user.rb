class User < ApplicationRecord
  PREFIX = "@"

  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :password, allow_nil: true, length: {minimum: 6}
end