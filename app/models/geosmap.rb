# == Schema Information
#
# Table name: geosmaps
#
#  id           :integer          not null, primary key
#  centerlat    :float
#  centerlng    :float
#  name         :string(255)
#  zoom         :integer
#  maptype      :string(255)
#  incident_id  :integer
#  operation_id :integer
#  sector_id    :integer
#  user_id      :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Geosmap < ActiveRecord::Base
  # attr_accessible :title, :body
end
