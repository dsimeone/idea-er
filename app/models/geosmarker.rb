class Geosmarker < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible  :name, :lat, :lng, :address
  has_and_belongs_to_many :situation_geosmaps
  
end
