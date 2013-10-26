# == Schema Information
#
# Table name: geosmarkers
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  lat        :float
#  lng        :float
#  icon       :string(255)
#  address    :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Geosmarker < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible  :name, :lat, :lng, :address
  has_and_belongs_to_many :situation_geosmaps
  
end
