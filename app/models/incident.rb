# == Schema Information
#
# Table name: incidents
#
#  id             :integer          not null, primary key
#  title          :string(255)
#  lat            :float
#  lng            :float
#  description    :text
#  incidentType   :string(255)
#  incidentStatus :string(255)
#  finalizedTime  :datetime
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Incident < ActiveRecord::Base
  attr_accessible :description, :finalizedTime, :incidentStatus, :incidentType, :lat, :lng, :title
end
