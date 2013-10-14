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

require 'spec_helper'

describe Geosmap do
  pending "add some examples to (or delete) #{__FILE__}"
end
