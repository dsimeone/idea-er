require "spec_helper"

describe SituationGeosmapsController do
  describe "routing" do

    it "routes to #index" do
      get("/situation_geosmaps").should route_to("situation_geosmaps#index")
    end

    it "routes to #new" do
      get("/situation_geosmaps/new").should route_to("situation_geosmaps#new")
    end

    it "routes to #show" do
      get("/situation_geosmaps/1").should route_to("situation_geosmaps#show", :id => "1")
    end

    it "routes to #edit" do
      get("/situation_geosmaps/1/edit").should route_to("situation_geosmaps#edit", :id => "1")
    end

    it "routes to #create" do
      post("/situation_geosmaps").should route_to("situation_geosmaps#create")
    end

    it "routes to #update" do
      put("/situation_geosmaps/1").should route_to("situation_geosmaps#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/situation_geosmaps/1").should route_to("situation_geosmaps#destroy", :id => "1")
    end

  end
end
