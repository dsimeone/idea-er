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

require 'spec_helper'

describe SituationGeosmap do
  pending "add some examples to (or delete) #{__FILE__}"
end
