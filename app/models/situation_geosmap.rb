# == Schema Information
#
# Table name: situation_geosmaps
#
#  id         :integer          not null, primary key
#  centerlat  :float
#  centerlng  :float
#  name       :string(255)
#  zoom       :integer
#  maptype    :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class SituationGeosmap < ActiveRecord::Base
  attr_accessible :name, :zoom, :maptype, :centerlat, :centerlng
end
