require 'spec_helper'

describe "incident_types/new" do
  before(:each) do
    assign(:incident_type, stub_model(IncidentType,
      :name => "MyString"
    ).as_new_record)
  end

  it "renders new incident_type form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", incident_types_path, "post" do
      assert_select "input#incident_type_name[name=?]", "incident_type[name]"
    end
  end
end
