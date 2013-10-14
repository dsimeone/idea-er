require 'spec_helper'

describe "incident_statuses/index" do
  before(:each) do
    assign(:incident_statuses, [
      stub_model(IncidentStatus,
        :name => "Name"
      ),
      stub_model(IncidentStatus,
        :name => "Name"
      )
    ])
  end

  it "renders a list of incident_statuses" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Name".to_s, :count => 2
  end
end
