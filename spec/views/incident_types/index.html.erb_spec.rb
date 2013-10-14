require 'spec_helper'

describe "incident_types/index" do
  before(:each) do
    assign(:incident_types, [
      stub_model(IncidentType,
        :name => "Name"
      ),
      stub_model(IncidentType,
        :name => "Name"
      )
    ])
  end

  it "renders a list of incident_types" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Name".to_s, :count => 2
  end
end
