require 'spec_helper'

describe "incident_statuses/show" do
  before(:each) do
    @incident_status = assign(:incident_status, stub_model(IncidentStatus,
      :name => "Name"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Name/)
  end
end
