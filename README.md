# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: fales, unique: true|
|mail|string|null: false|

### Association
- has_many :groups, through: users_groups
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: fales, unique: true|

### Association
- has_many :message
- has_many :users, through: users_groups


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: false|

### Association
- belongs_to :group
- belongs_to :user

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user