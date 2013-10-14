# == Schema Information
#
# Table name: incident_types
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class IncidentType < ActiveRecord::Base
  attr_accessible :name
end
