require 'spec_helper'

describe "incidents/show" do
  before(:each) do
    @incident = assign(:incident, stub_model(Incident,
      :title => "Title",
      :lat => 1.5,
      :lng => 1.5,
      :description => "MyText",
      :incidentType => "Incident Type",
      :incidentStatus => "Incident Status"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Title/)
    rendered.should match(/1.5/)
    rendered.should match(/1.5/)
    rendered.should match(/MyText/)
    rendered.should match(/Incident Type/)
    rendered.should match(/Incident Status/)
  end
end
