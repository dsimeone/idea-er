require 'spec_helper'

describe "incident_types/edit" do
  before(:each) do
    @incident_type = assign(:incident_type, stub_model(IncidentType,
      :name => "MyString"
    ))
  end

  it "renders the edit incident_type form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", incident_type_path(@incident_type), "post" do
      assert_select "input#incident_type_name[name=?]", "incident_type[name]"
    end
  end
end
