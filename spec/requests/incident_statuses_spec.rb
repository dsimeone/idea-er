require 'spec_helper'

describe "IncidentStatuses" do
  describe "GET /incident_statuses" do
    it "works! (now write some real specs)" do
      # Run the generator again with the --webrat flag if you want to use webrat methods/matchers
      get incident_statuses_path
      response.status.should be(200)
    end
  end
end
