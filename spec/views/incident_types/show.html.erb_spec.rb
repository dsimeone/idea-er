require 'spec_helper'

describe "incident_types/show" do
  before(:each) do
    @incident_type = assign(:incident_type, stub_model(IncidentType,
      :name => "Name"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Name/)
  end
end
