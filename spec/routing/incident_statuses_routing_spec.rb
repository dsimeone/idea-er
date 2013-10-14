require "spec_helper"

describe IncidentStatusesController do
  describe "routing" do

    it "routes to #index" do
      get("/incident_statuses").should route_to("incident_statuses#index")
    end

    it "routes to #new" do
      get("/incident_statuses/new").should route_to("incident_statuses#new")
    end

    it "routes to #show" do
      get("/incident_statuses/1").should route_to("incident_statuses#show", :id => "1")
    end

    it "routes to #edit" do
      get("/incident_statuses/1/edit").should route_to("incident_statuses#edit", :id => "1")
    end

    it "routes to #create" do
      post("/incident_statuses").should route_to("incident_statuses#create")
    end

    it "routes to #update" do
      put("/incident_statuses/1").should route_to("incident_statuses#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/incident_statuses/1").should route_to("incident_statuses#destroy", :id => "1")
    end

  end
end
