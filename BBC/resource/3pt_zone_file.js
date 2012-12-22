BBC.adverts.setZone({zones:{
        data:{
            ads:false,
            site:"bbccom.live.site.news",
            zone:"_default",
            keyValues:{
                sectn:"news",
                ctype:"content"
            },
            slots:{
                bottom:false,
                skyscraper:false,
                partner_button3:false,
                partner_button4:false,
                partner_button5:false,
                partner_button6:false,
                partner_button7:false,
                partner_button8:false,
                "mpu_bottom":false
            }
        },
		zones:[

            /*******************************************************************
             * BBC Homepage
             ******************************************************************/

			{
				uri:"/home/",
				data:{
					ads:true,
					site:"bbccom.live.site.www",
					zone:"bbc_homepage_int",
					keyValues:{
                        nnsec:"homepage_int",
                        sectn:"nonnews"},
					domValues:{
                        spotlight_title:".featuredToday h3 a",
                        spotlight_title_v3:"#featuredToday_sponsorAd h3 a"
                    },
					slots:{
// Homepage 3.5 (Modules are enabled by default, unless set to 'false'.
// Homepage json config determines if JS is built into modules html)
//                        module_0002l:true,   // Entertainment
//                        module_0001k:true,   // Weather
//                        module_0001f:true,   // Travel
//                        module_0000i:true,   // Spotlight
//                        module_00029:true    // Most Popular
//                        module_00008:true    // Sport
                    },
                    slotSize:{
                        mpu:"300x250,300x600,336x850"
                    }
                    /* Commenting out moveable leader board for deployment,
                    movable:{
                        leaderboard:true
                    }
                    */
				}
			},

            /*******************************************************************
             * TV
             ******************************************************************/

            {
                uri:"/tv/",
                data:{
                    ads:true,
                    site:"bbccom.live.site.tv",
                    zone:"bbc_tv_int",
                    keyValues:{
                        nnsec:"tv_int",
                        sectn:"nonnews"
                    },
                    slots:{},
                    slotSize:{
                        mpu:"160x600,300x250,300x600,336x700,336x850,336x280",
                        promo:"336x350"
                    }
                }
            },

            /*******************************************************************
             * News
             ******************************************************************/

			{
				uri:"/2/hi",
				data:{
					ads:true,
					zone:"_default",
					keyValues:{
						news:"default"
					},
                    slots:{
                        sponsor_section:false,
                        "mpu_bottom":true,
                        "module_hyper-promotional-content":false,  // BBCCOM-2265: Remove slots
                        "module_special-reports":false,
                        "module_most-popular-category":false,
                        "module_most-popular":false,
                        "module_market-data-include":false
                    },
                    movable:{
                        mpu:true
                    }
				},
				zones:[
					{
						uri:"/front_page/default.stm",
						data:{
							zone:"news_homepage_int",
							keyValues:{
								news:"homepage_int"
							}
						}
					},
					{
                        uri:"/also_in_the_news/",
                        data:{zone:"news_alsointhenews_content", keyValues:{news:"alsointhenews"}}
					},
					{
                        uri:"/in_pictures/",
                        data:{zone:"news_inpictures_content", keyValues:{news:"inpictures"}, slots:{sponsor_section:true}}
					},
					{
                        uri:"/uk_news/magazine/",
                        data:{zone:"news_magazine_content", keyValues:{news:"magazine"}}
					},
					{
                        uri:"/business/",
                        data:{
                            zone:"news_business_content",
                            keyValues:{
                                news:"business"
                            },
							slots:{
                                sponsor_section:true
							}
                        },
                        zones:[
                            {
                                uri:"asia_business/",
                                data:{zone:"news_asiabusiness_content", keyValues:{news:"asiabusiness"}}
                            },
                            {
                                uri:"aerospace/",
                                data:{zone:"news_aerospace_content", keyValues:{news:"aerospace"}}
                            },
                            {   // BBCCOM-758
                                uri:"business_of_sport/",
                                data:{zone:"news_businessofsport_content", keyValues:{news:"companies"}}
                            },
                            {
                                uri:"companies/",
                                data:{zone:"news_companies_content", keyValues:{news:"companies"}}
                            },
                            {   // Davos 2009
                                uri:"davos/",
                                data:{zone:"news_davos_content", keyValues:{news:"davos"}}
                            },
                            {
                                uri:"economy/",
                                data:{zone:"news_economy_content", keyValues:{news:"economy"}}
                            },
                            {
                                uri:"global_car_industry/",
                                data:{zone:"news_detroitcarshow_content", keyValues:{news:"detroitcarshow"}}
                            },
                            {
                                uri:"market_data/overview/",
                                data:{zone:"news_marketdata_content", keyValues:{news:"marketdata"}}
                            },
                            {
                                uri:"market_data/stockmarket/",
                                data:{zone:"news_marketdatastockmarket_content", keyValues:{news:"marketdata"}}
                            },
                            {
                                uri:"market_data/shares/",
                                data:{zone:"news_marketdatashares_content", keyValues:{news:"marketdata"}}
                            },
                            {
                                uri:"market_data/currency/",
                                data:{zone:"news_marketdatacurrency_content", keyValues:{news:"marketdata"}}
                            },
                            {
                                uri:"market_data/commodities/",
                                data:{zone:"news_marketdatacommodities_content", keyValues:{news:"marketdata"}}
                            },
                            {
                                uri:"market_data/gilt/",
                                data:{zone:"news_marketdatagilt_content", keyValues:{news:"marketdata"}}
                            },
                            {
                                uri:"market_data/earnings/",
                                data:{zone:"news_marketdataearnings_content", keyValues:{news:"marketdata"}}
                            },
                            {
                                uri:"your_money/12205462",
                                data:{zone:"news_smallbusiness_index", keyValues:{news:"smallbusiness"}}
                            },
                            {
                                uri:"11428889",
                                data:{zone:"news_techofbusiness_content", keyValues:{news:"techofbusiness"}}
                            },
                            {
                                uri:"11629784",
                                data:{zone:"news_startup_index", keyValues:{news:"startup"}}
                            },
                            {
                                uri:"13353814",
                                data:{zone:"news_oneinabillion_index", keyValues:{news:"oneinabillion"}}
                            },
                            {
                                uri:"12010322",
                                data:{zone:"news_businessroundup_index", keyValues:{news:"businessroundup"}}
                            },
                            {
                                uri:"15521824",
                                data:{zone:"news_energyfutures_index", keyValues:{news:"energyfutures"}}
                            },
                            {   // Davos 2011 feature index
                                uri:"12175813",
                                data:{zone:"news_davos_index", keyValues:{news:"davos"}}
                            },
                            {   // BBCCOM-759 Africa Business feature index
                                uri:"12832792",
                                data:{zone:"news_africabusiness_index", keyValues:{news:"africabus"}}
                            },
                            {   // BBCCOM-933 One in a Billion feature index
                                uri:"13689890",
                                data:{zone:"news_oneinabillion_index", keyValues:{news:"oneinabillion"}}
                            },
                            {   // BBCCOM-953 Power of Asia feature index
                                uri:"13710859",
                                data:{zone:"news_powerofasia_index", keyValues:{news:"powerofasia"}}
                            },
                            {
                                // BBCCOM-989 New Middle Class feature index
                                uri:"13845032",
                                data:{zone:"news_newmiddleclass_index", keyValues:{news:"newmiddleclass"}}
                            },
                            {
                                // BBCCOM-1509  New zone file for Knowledge Economy
                                uri:"12686570",
                                data:{zone:"news_knowledgeeconomy_index", keyValues:{news:"knowledgeeconomy"}}
                            },
                            {
                                // BBCCOM-1810 New Zone for At Home Abroad
                                uri:"15736065",
                                data: {zone:"news_athomeabroad_index", keyValues: {news:"athomeabroad"}}
                            },
                            {
                                // BBCCOM-2166 My Business
                                uri:"15870435",
                                data: {zone:"news_mybusiness_index", keyValues: {news:"mybusiness"}}
                            },
                            {
                                // BBCCOM-2221 Your Money
                                uri:"your_money",
                                data: {zone:"news_rab_index", keyValues: {news:"rab"}}
                            },
                            {
                                // BBCCOM-2465 Running a Business
                                uri:"16611973",
                                data: {zone:"news_rab_index", keyValues: {news:"rab"}}
                            }
                        ]
					},
					{
                        uri:"/health/",
                        data:{zone:"news_health_content", keyValues:{news:"health"}}
					},
					{
                        uri:"/health/medical_notes/",
                        data:{zone:"news_medicalnotes_content", keyValues:{news:"medicalnotes"}}
					},
					{
                        uri:"/science_and_environment/",
                        data:{zone:"news_science_content", keyValues:{news:"science"}}
					},
                    {
                        uri:"/special_reports/global_economy/",
                        data:{zone:"news_special_reports_global_economy", keyValues:{news:"globaleconomy"}}
                    },
					{
                        uri:"/technology/",
                        data:{
                            zone:"news_technology_content",
                            keyValues:{
                                news:"technology"
                            },
                            slots:{
                                sponsor_section:true
                            }
                        },
                        zones:[
                            {
                                uri:"14803871",
                                data:{
                                    zone:"news_ideaschangeworld_index",
                                    keyValues:{
                                        news:"technology"
                                    }
                                }
                            }
                        ]
					},
                    {
                        uri:"/entertainment_and_arts",
                        data:{
                            zone:"news_entertainment_content",
                            keyValues:{
                                news:"entertainment"
                            },
                            slots:{
                                sponsor_section:true
                            }
                        },
                        zones:[
                            {
                                uri:"/12252017",
                                data:{
                                    zone:"news_oscars_index",
                                    keyValues:{
                                        news:"entertainment"
                                    }
                                }
                            }
                        ]
                    },
					{
                        uri:"/in_depth/",
                        data:{zone:"news_indepth_content", keyValues:{news:"indepth"}}
					},
					{
                        uri:"/in_depth/americas/2008/vote_usa_2008/",
                        data:{zone:"news_uselection_content", keyValues:{news:"uselection"}}
					},
					{
                        uri:"/in_depth/sci_tech/green_room/",
                        data:{zone:"news_greenroom_content", keyValues:{news:"greenroom"}}
					},
					{
                        uri:"/in_depth/americas/2008/obama_presidency/",
                        data:{zone:"news_obama_content", keyValues:{news:"obama"}}
					},
					{
                        uri:"/in_depth/business/2009/davos/",
                        data:{zone:"news_davos_content", keyValues:{news:"davos"}}
					},
					{
                        uri:"/in_depth/business/2010/davos/",
                        data:{zone:"news_davos_content", keyValues:{news:"davos"}}
					},
					{
                        uri:"/in_depth/business/aerospace/",
                        data:{zone:"news_aerospace_content", keyValues:{news:"aerospace"}}
					},
					{
                        uri:"/in_depth/south_asia/2009/indian_election/",
                        data:{zone:"news_indianelection_default", keyValues:{news:"indiaelection"}}
					},
					{
                        uri:"/in_depth/business/africa_business/",
                        data:{zone:"news_africa_business", keyValues:{news:"africabus"}}
					},
					{
                        uri:"/in_depth/sci_tech/2009/copenhagen/",
                        data:{zone:"news_scitechcopenhagen_content", keyValues:{news:"newsscitechcopenhagencontent"}}
					},
					{
                        uri:"/in_depth/sci_tech/digital_giants/",
                        data:{zone:"news_scitechdigitalgiants_content", keyValues:{news:"newsscitechdigitalgiantscontent"}}
					},
					{
                        uri:"/programmes/gmt/",
                        data:{zone:"news_gmt_content", keyValues:{news:"gmt"}}
					},
					{
                        uri:"/programmes/the_hub/",
                        data:{zone:"news_thehub_content", keyValues:{news:"thehub"}}
					},
					{
                        uri:"/programmes/fast_track/",
                        data:{zone:"news_fasttrack_content", keyValues:{news:"fasttrack"}}
					},
					{
                        uri:"/programmes/impact_asia/",
                        data:{zone:"news_impactasia_content", keyValues:{news:"impactasia"}}
					},
					{
                        uri:"/programmes/direct/",
                        data:{
                            zone:"news_direct_content",
                            keyValues:{
                                news:"direct"
                            }
                        },
                        zones:[
                            {
                                uri:"ukraine/",
                                data:{zone:"news_ukrainedirect_content", keyValues:{news:"ukrainedirect"}}
                            },
                            {
                                uri:"indonesia/",
                                data:{zone:"news_indonesiadirect_content", keyValues:{news:"indonesiadirect"}}
                            }
                        ]
					},
                    {
                        uri:"/world_radio_and_tv/16159225",
                        data:{zone:"news_ukdirect_index", keyValues:{news:"ukdirect"}}
                    },
                    {
                        uri:"/world_radio_and_tv/14237364",
                        data:{zone:"news_malaysiadirect_index", keyValues:{news:"malaysiadirect"}}
                    },
                    {
                        uri:"/world_radio_and_tv/14748120",
                        data:{zone:"news_taiwandirect_index", keyValues:{news:"taiwandirect"}}
                    },
                    {
                        uri:"/world_radio_and_tv/15386555",
                        data:{zone:"news_indiadirect_index", keyValues:{news:"indiadirect"}}
                    },
                    {
                        uri:"/world_radio_and_tv/16686402",
                        data:{zone:"news_mexicodirect_index", keyValues:{news:"mexicodirect"}}
                    },
                    {
                        uri:"/world_radio_and_tv/17028917",
                        data:{zone:"news_japandirect_index", keyValues:{news:"japandirect"}}
                    },
                    {
                        uri:"/world_radio_and_tv/16446320",
                        data:{
                            ads:false
                        }
                    },
					{
                        uri:"/programmes/world_news_today/",
                        data:{zone:"news_worldnewstoday_content", keyValues:{news:"worldnewstoday"}}
					},
					{
                        uri:"/programmes/business_edition/",
                        data:{zone:"news_businessedition_content", keyValues:{news:"businessedition"}}
					},
					{
                        uri:"/programmes/world_news_america/",
                        data:{zone:"news_worldnewsamerica_content", keyValues:{news:"worldnewsamerica"}}
					},
					{
                        uri:"/programmes/world_news_america/highlights/",
                        data:{zone:"news_worldnewsamericahighlights_content", keyValues:{news:"worldnewsamericahighlights"}}
					},
					{
                        uri:"/programmes/click_online/",
                        data:{
                            zone:"news_clickonline_content",
                            keyValues:{
                                news:"click"
                            },
                            styles:{
                                'sponsor_section':{
                                    style:'top:19px; left:486px; color:#fff; text-align:left; width:400px;'
                                },
                                'sponsor_section_text':{
                                    style:'padding:10px; float:left;'
                                },
                                'sponsor_section_image':{
                                    style:'float:left;'
                                }
                            }
                        }
					},
					{
                        uri:"/programmes/hardtalk/",
                        data:{
                            zone:"news_hardtalk_content",
                            keyValues:{
                                news:"hardtalk"
                            },
                            slots:{
                                adsense_middle:false,
                                adsense_mpu:false
                            }
                        }
					},
					{
                        uri:"/have_your_say/",
                        data:{zone:"news_haveyoursay_content", keyValues:{news:"haveyoursay"}}
					},
					{
                        uri:"/video_and_audio/10462520",
                        data:{zone:"news_videoandaudio_index", keyValues:{news:"newsvideoandaudioindex"}, slots:{sponsor_section:true}}
					},
					{
                        uri:"/programmes/real_cities/",
                        data:{
                            zone:"news_realcities_content",
                            keyValues:{
                                news:"newsrealcitiescontent"
                            },
                            slots:{
                                sponsor_section:true,
                                adsense_mpu:false,
                                adsense_middle:false,
                                storyprintsponsorship:false
                            },
                            styles:{
                                'sponsor_section':{
                                    style:'right:auto;top:33px;left:176px;'
                                },
                                'sponsor_section_text':{
                                    style:'color:#505050;display:inline-block;'
                                },
                                'sponsor_section_image':{
                                    style:'display:inline-block;'
                                }
                            }
                        }
                    },
					{
                        uri:"/uk/",
                        data:{
                            zone:"news_uk_content",
                            keyValues:{
                                news:"uk"
                            }
                        },
                        zones:[
                            {
                                uri:"11767495",
                                data:{
                                    zone:"news_royalwedding_index",
                                    keyValues:{
                                        news:"royalwedding"
                                    },
                                    slots:{
                                      adsense_mpu:false,
                                      adsense_middle:false
                                    }
                                }
                            },
                            {
                                uri:"13132410",
                                data:{
                                    ads:false,  // disable adverts on live events page
                                    zone:"news_royalweddingliveevent_index",
                                    keyValues:{
                                        news:"royalwedding"
                                    }
                                }
                            }
                        ]
					},
					{
                        uri:"/england/",
                        data:{zone:"news_uk_content", keyValues:{news:"uk"}}
                    },
					{
                        uri:"/northern_ireland/",
                        data:{zone:"news_uk_content", keyValues:{news:"uk"}}
                    },
					{
                        uri:"/scotland/",
                        data:{zone:"news_uk_content", keyValues:{news:"uk"}}
                    },
					{
                        uri:"/wales/",
                        data:{zone:"news_uk_content", keyValues:{news:"uk"}}
                    },
					{
                        uri:"/politics/",
                        data:{zone:"news_politics_content", keyValues:{news:"politics"}}
					},
					{
                        uri:"/education/",
                        data:{zone:"news_education_content", keyValues:{news:"education"}}
					},
					{
                        uri:"/magazine/",
                        data:{zone:"news_magazine_content", keyValues:{news:"magazine"}},
                        zones:[
                           {
                                uri:"14760627",
                                data:{
                                zone:"news_alteredstates_index"
                            }
                            },
                            {
                                uri:"14633099",
                                data:{
                                zone:"news_firstperson_index"
                                }
                            },
                            {
                                uri:"14760626",
                                data:{
                                zone:"news_livingonline_index"
                                }
                            },
                            {
                                uri:"14760628",
                                data:{
                                zone:"news_picturethis_index"
                                }
                            }
                       ]
					},
					{
                        uri:"/world/",
                        data:{
							zone:"news_world_content",
							keyValues:{
                                news:"world"
                            }
                        },
                        zones:[
                            {
                                uri:"us_and_canada/",
                                data:{
                                    zone:"news_usandcanada_content",
                                    keyValues:{
                                        news:"america"
                                    }
                                },
                                zones:[
                                    {
                                        uri:"15949569",
                                        data:{
                                            zone:"news_uselection_index",
                                            keyValues:{
                                                news:"uselection"
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                uri:"latin_america/",
                                data:{
                                    zone:"news_latinamerica_content",
                                    keyValues:{
                                        news:"america"
                                    }
                                }
                            },
                            {
                                uri:"africa/",
								data:{zone:"news_africa_content", keyValues:{news:"africa"}}
                            },
							{
								uri:"europe/",
								data:{zone:"news_europe_content", keyValues:{news:"europe"}}
							},
							{
								uri:"middle_east/",
								data:{zone:"news_middleeast_content", keyValues:{news:"middleeast"}}
							},
							{
								uri:"asia/",
								data:{zone:"news_asia_content", keyValues:{news:"asia"}}
							},
							{
								uri:"south_asia/",
								data:{zone:"news_asia_content", keyValues:{news:"asia"}}
							},
							{
								uri:"asia_pacific/",
								data:{zone:"news_asia_content", keyValues:{news:"asia"}}
							},
                            {
                                uri:"asia/china/",
                                data:{zone:"news_asiachina_content", keyValues:{news:"asiachina"}}
                            },
                            {
                                uri:"asia/india/",
                                data:{zone:"news_asiaindia_content", keyValues:{news:"asiaindia"}}
                            },
                            {
                                // BBCCOM-1608 New zone file for Generation Asia
                                uri:"asia/15453026",
                                data:{zone:"news_generationasia_content", keyValues:{news:"generationasia"}}
                            },
                            {
                                // BBCCOM-1841 New zone for World Aids Day
                                uri:"15823409",
                                data: {zone:"news_worldaids_index", keyValues: {news:"worldaids"}}
                            }
                        ]
					}
                ]
			},

            /*******************************************************************
             * Earth (in News, not BBC Earth)
             ******************************************************************/

			{
				uri:"/earth/hi",
				data:{
					ads:true,
					zone:"earth",
					keyValues:{
						news:"earth"
					},
                    slots:{
                        sponsor_section:false
                    }
				},
				zones:[
                    {
                        uri:"/earth_news",
                        data:{
                            zone:"news_earth",
                            keyValues:{
                                news:"earth"
                            }
                        }
                    }
                ]
			},

            /*******************************************************************
             * Blogs
             ******************************************************************/

			{
				uri:"/blogs",
				data:{
                    ads:false,
                    zone:"_default",
                    keyValues:{
                        blogs:"blogs"
                    }
                },
				zones:[
					{
						uri:"/testadverts/",
						data:{ads:true, zone:"test", site:"bbccom.test.site.flash", keyValues:{blogs:"blogs"}}
					},
					{
						uri:"/bendirs/",
						data:{ads:true, zone:"blogs_sport_content", keyValues:{blogs:"bendirs"}}
					},
					{
						uri:"/chrischarles/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"chrischarles"}}
					},
					{
						uri:"/ethicalman/",
						data:{ads:true, zone:"blogs_news_science_content", keyValues:{blogs:"ethicalman"}}
					},
					{
						uri:"/f1mole/",
						data:{ads:true, zone:"blogs_sport_motorsport_content", keyValues:{blogs:"f1mole"}}
					},
					{
						uri:"/gordonfarquhar/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"gordonfarquhar"}}
					},
					{
						uri:"/magazinemonitor/",
						data:{ads:true, zone:"blogs_sport_motorsport_content", keyValues:{blogs:"magazinemonitor"}}
					},
					{
						uri:"/nickrobinson/",
						data:{ads:true, zone:"blogs_news_business_content", keyValues:{blogs:"nickrobinson"}}
					},
					{
						uri:"/paulfletcher/",
						data:{ads:true, zone:"blogs_sport_cricket_content", keyValues:{blogs:"paulfletcher"}}
					},
					{
						uri:"/philmcnulty/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"philmcnulty"}}
					},
					{
						uri:"/philminshull/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"philminshull"}}
					},
					{
						uri:"/photoblog/",
						data:{ads:true, zone:"blogs_news_inpictures_content", keyValues:{blogs:"photoblog"}}
					},
					{
						uri:"/robborobson/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"robborobson"}}
					},
					{
						uri:"/technology/",
						data:{ads:true, zone:"blogs_news_technology_content", keyValues:{blogs:"technology"}}
					},
					{
						uri:"/thereporters/franzstrasser/",
						data:{ads:true, zone:"blogs_news_america_content", keyValues:{blogs:"thereportersfranzstrasser"}}
					},
					{
						uri:"/thereporters/gavinhewitt/",
						data:{ads:true, zone:"blogs_news_europe_content", keyValues:{blogs:"thereportersgavinhewitt"}}
					},
					{
						uri:"/thereporters/jonathanamos/",
						data:{ads:true, zone:"blogs_news_technology_content", keyValues:{blogs:"thereportersjonathanamos"}}
					},
					{
						uri:"/thereporters/markeaston/",
						data:{ads:true, zone:"blogs_news_uk_content", keyValues:{blogs:"thereportersmarkeaston"}}
					},
					{
						uri:"/thereporters/markmardell/",
						data:{ads:true, zone:"blogs_news_america_content", keyValues:{blogs:"thereportersmarkmardell"}}
					},
					{
						uri:"/thereporters/nickbryant/",
						data:{ads:true, zone:"blogs_news_australia_content", keyValues:{blogs:"thereportersnickbryant"}}
					},
					{
						uri:"/thereporters/richardblack/",
						data:{ads:true, zone:"blogs_news_science_content", keyValues:{blogs:"thereportersrichardblack"}}
					},
					{
						uri:"/thereporters/robertpeston/",
						data:{ads:true, zone:"blogs_news_business_content", keyValues:{blogs:"thereportersrobertpeston"}}
					},
					{
						uri:"/thereporters/soutikbiswas/",
						data:{ads:true, zone:"blogs_news_india_content", keyValues:{blogs:"thereporterssoutikbiswas"}}
					},
					{
						uri:"/thereporters/stephanieflanders/",
						data:{ads:true, zone:"blogs_news_business_content", keyValues:{blogs:"thereportersstephanieflanders"}}
					},
					{
						uri:"/timvickery/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"timvickery"}}
					},
					{
						uri:"/tomfordyce/",
						data:{ads:true, zone:"blogs_sport", keyValues:{blogs:"tomfordyce"}}
					},
					{
						uri:"/simonaustin/",
						data:{ads:true, zone:"blogs_sport", keyValues:{blogs:"simonaustin"}}
					},
					{
						uri:"/stevewilson/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"stevewilson"}}
					},
					{
						uri:"/oliverbrett/",
						data:{ads:true, zone:"blogs_sport_cricket_content", keyValues:{blogs:"oliverbrett"}}
					},
					{
						uri:"/mattslater/",
						data:{ads:true, zone:"blogs_sport", keyValues:{blogs:"mattslater"}}
					},
					{
						uri:"/chrisbevan/",
						data:{ads:true, zone:"blogs_sport", keyValues:{blogs:"chrisbevan"}}
					},
					{
						uri:"/danwalker/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"danwalker"}}
					},
					{
						uri:"/jakehumphrey/",
						data:{ads:true, zone:"blogs_sport_formulaone_content", keyValues:{blogs:"jakehumphrey"}}
					},
					{
						uri:"/sarahholt/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"sarahholt"}}
					},
					{
						uri:"/jonathanlegard/",
						data:{ads:true, zone:"blogs_sport_formulaone_content", keyValues:{blogs:"jonathanlegard"}}
					},
					{
						uri:"/annathompson/",
						data:{ads:true, zone:"blogs_sport", keyValues:{blogs:"annathompson"}}
					},
					{
						uri:"/robhodgetts/",
						data:{ads:true, zone:"blogs_sport", keyValues:{blogs:"robhodgetts"}}
					},
					{
						uri:"/jonathanoverend/",
						data:{ads:true, zone:"blogs_sport_tennis_content", keyValues:{blogs:"jonathanoverend"}}
					},
					{
						uri:"/iaincarter/",
						data:{ads:true, zone:"blogs_sport_golf_content", keyValues:{blogs:"iaincarter"}}
					},
					{
						uri:"/piersedwards/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"piersedwards"}}
					},
					{
						uri:"/danroan/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"danroan"}}
					},
					{
						uri:"/worldcupmotty/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"worldcupmotty"}}
					},
					{
						uri:"/thereporters/andrewharding/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"andrewharding"}}
					},
					{
						uri:"/davidbond/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"davidbond"}}
					},
					{
						uri:"/jonathanstevenson/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"jonathanstevenson"}}
					},
					{
						uri:"/chrisjardine/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"chrisjardine"}}
					},
					{
						uri:"/jackross/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"jackross"}}
					},
					{
						uri:"/jimspence/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"jimspence"}}
					},
					{
						uri:"/joeltaggart/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"joeltaggart"}}
					},
					{
						uri:"/joeltaggart/",
						data:{ads:true, zone:"blogs_sport_football_content", keyValues:{blogs:"leighgriffiths"}}
					}
				]
			},

            /*******************************************************************
             * Weather
             ******************************************************************/

			{
                uri:"/weather",
                data:{
                    ads:true,
                    zone:"weather_forcast",
                    keyValues:{
                        weather:"forcast",
                        adsense_mpu:"adsense_mpu_weather",
                        adsense_middle:"adsense_middle_weather"
                    }
                },
                zones:[
                    {
                    uri:"/hi/news",
                    data:{zone:"weather_news", keyValues:{weather:"news"}}
                    },
                    {
                    uri:"/hi/gallery",
                    data:{zone:"weather_photogallery", keyValues:{weather:"photogallery"}}
                    },
                    {
                    uri:"/hi/weatherwise",
                    data:{zone:"weather_weatherwise", keyValues:{weather:"weatherwise"}}
                    },
                    {
                    uri:"/hi/about",
                    data:{zone:"weather_about", keyValues:{weather:"about"}}
                    },
                    {
                    uri:"/hi/uk_reviews",
                    data:{zone:"weather_ukreviews", keyValues:{weather:"ukreviews"}}
                    },
                    {
                    uri:"/hi/uk_warnings",
                    data:{zone:"weather_ukwarnings", keyValues:{weather:"weather_ukwarnings"}}
                    }
                ]
			},

            /*******************************************************************
             * Sport
             ******************************************************************/
            
			{
                uri:"/sport2/hi",
                data:{
                    ads:true,
                    zone:"_default",
                    keyValues:{
                        sectn:"sport"
                    }
                },
                zones:[
                    {
                        uri:"/default.stm",
                        data:{
                            zone:"sport_homepage_int",
                            keyValues:{
                                sport:"homepage_int",
                                sectn:"sport"
                            }
                        }
                    },
                    {
                        uri:"/archery/",
                        data:{zone:"sport_archery_content", keyValues:{sport:"archery"}}
                    },
                    {
                        uri:"/athletics/",
                        data:{zone:"sport_athletics_content", keyValues:{sport:"athletics"}}
                    },
                    {
                        uri:"/boxing/",
                        data:{zone:"sport_boxing_content", keyValues:{sport:"boxing"}}
                    },
                    {
                        uri:"/commonwealth_games/",
                        data:{zone:"sport_commonwealthgames_content", keyValues:{sport:"commonwealthgames"}}
                    },
                    {
                        uri:"/cricket/",
                        data:{zone:"sport_cricket_content", keyValues:{sport:"cricket"}}
                    },
                    {
                        uri:"/fencing/",
                        data:{zone:"sport_fencing_content", keyValues:{sport:"fencing"}}
                    },
                    {
                        uri:"/football/",  // => /sport2/hi/football/
                        data:{
                            zone:"sport_football_content",
                            keyValues:{
                                sport:"football"
                            }
                        },
                        zones:[
                            {
                                uri:"africa",
                                data:{
                                    zone:"sport_footballafrica_content"
                                }
                            },
                            {
                                uri:"championship",
                                data:{
                                    zone:"sport_footballchampionship_content"
                                }
                            },
                            {
                                uri:"champions-league",
                                data:{
                                    zone:"sport_footballchampionsleague_content"
                                }
                            },
                            {
                                uri:"conference",
                                data:{
                                    zone:"sport_footballconference_content"
                                }
                            },
                            {
                                uri:"eng_prem/",
                                data:{
                                    zone:"sport_footballpremierleague_content"
                                }
                            },
                            {
                                uri:"european[-_]championship/2012",  // regexp european_championship, european-championship
                                data:{
                                    zone:"sport_footballeuro2012_content"
                                }
                            },
                            {
                                uri:"europa-league",
                                data:{
                                    zone:"sport_footballeuropaleague_content"
                                }
                            },
                            {
                                uri:"fa-cup",
                                data:{
                                    zone:"sport_footballfacup_content"
                                }
                            },
                            {
                                uri:"fixtures",
                                data:{
                                    zone:"sport_footballfixtures_content"
                                }
                            },
// Page has incorrect sectionPath: http://www.bbc.co.uk/sport/0/football/gossip/
//                            {
//                                uri:"gossip",
//                                data:{
//                                    zone:"sport_footballgossip_content"
//                                }
//                            },
                            {  // Old Gossip and Transfers pages:
                                uri:"gossip_and_transfers",
                                data:{
                                    zone:"sport_footballgossipandtransfers_content"
                                }
                            },
                            {
                                uri:"internationals",
                                data:{
                                    zone:"sport_footballinternationals_content"
                                }
                            },
                            {
                                uri:"irish",
                                data:{
                                    zone:"sport_footballirish_content"
                                }
                            },
                            {
                                uri:"league-cup",
                                data:{
                                    zone:"sport_footballleaguecup_content"
                                }
                            },
                            {
                                uri:"league-one",
                                data:{
                                    zone:"sport_footballleagueone_content"
                                }
                            },
                            {
                                uri:"league-two",
                                data:{
                                    zone:"sport_footballleaguetwo_content"
                                }
                            },
                            {
                                uri:"league_of_wales/",
                                data:{
                                    zone:"sport_footballwelsh_content"
                                }
                            },
                            {
                                uri:"live[-_]scores",
                                data:{
                                    zone:"sport_footballlivescores_content"
                                }
                            },
                            {
                                uri:"premier[-_]league",  // regexp for premier-league and premier_league
                                data:{
                                    zone:"sport_footballpremierleague_content"
                                }
                            },
                            {
                                uri:"results",
                                data:{
                                    zone:"sport_footballresults_content"
                                }
                            },
                            {
                                uri:"scottish",  // scottish-premier, scottish-first, second, third, scottish-cup, scottish-league-cup, scottish-challenge-cup
                                data:{
                                    zone:"sport_footballscottish_content"
                                }
                            },
                            {
                                uri:"tables",
                                data:{
                                    zone:"sport_footballtables_content"
                                }
                            },
                            {
                                uri:"teams",
                                data:{
                                    zone:"sport_footballteams_content"
                                }
                            },
                            {
                                uri:"women",
                                data:{
                                    zone:"sport_footballwomen_content"
                                }
                            }
                        ]
                    },
                    {
                        uri:"/formula1/",
                        data:{zone:"sport_formulaone_content", keyValues:{sport:"formulaone"}}
                    },
                    {
                        uri:"/front_page/",  /** Sports Refresh Front Page /sport/0/ */
                        data:{
                            zone:"sport_homepage_int",
                            keyValues:{
                                sport:"frontpage"
                            },
                            slotSize:{
                                mpu:"160x600,300x1050,300x250,300x600,336x280,336x700,336x850"
                            }
                       },
                        zones:[
                            {
                                uri:"14058510",
                                data:{zone:"sport_sportsdaylive_content",keyValues:{sport:"sportsdaylive"}}
                            }
                        ]
                    },
                    {
                        uri:"/handball/",
                        data:{zone:"sport_handball_content", keyValues:{sport:"handball"}}
                    },
                    {
                        uri:"/rugby_union/",
                        data:{zone:"sport_rugby_content", keyValues:{sport:"rugby"}}
                    },
                    {
                        uri:"/rugby_league/",
                        data:{zone:"sport_rugbyleague_content", keyValues:{sport:"rugbyleague"}}
                    },
                    {
                        uri:"/tennis/",
                        data:{zone:"sport_tennis_content", keyValues:{sport:"tennis"}}
                    },
                    {
                        uri:"/rowing/",
                        data:{zone:"sport_rowing_content", keyValues:{sport:"rowing"}}
                    },
                    {
                        uri:"/triathlon/",
                        data:{zone:"sport_triathlon_content", keyValues:{sport:"triathlon"}}
                    },
                    {
                        uri:"/modern_pentathlon/",
                        data:{zone:"sport_modernpentathlon_content", keyValues:{sport:"modernpentathlon"}}
                    },
                    {
                        uri:"/motorsport/",
                        data:{zone:"sport_motorsport_content", keyValues:{sport:"motorsport"}}
                    },
                    {
                        uri:"/motorsport/formula_one/",
                        data:{zone:"sport_formulaone_content", keyValues:{sport:"formulaone"}}
                    },
                    {
                        uri:"/other_sports/snooker/",
                        data:{zone:"sport_snooker_content", keyValues:{sport:"snooker"}}
                    },
                    {
                        uri:"/other_sports/american_football/",
                        data:{zone:"sport_americanfootball_content", keyValues:{sport:"americanfootball"}}
                    },
                    {
                        uri:"/other_sports/horse_racing/",
                        data:{zone:"sport_equestrian_content", keyValues:{sport:"equestrian"}}
                    },
                    {
                        uri:"/horse_racing/",
                        data:{zone:"sport_equestrian_content", keyValues:{sport:"equestrian"}}
                    },
                    {
                        uri:"/other_sports/basketball/",
                        data:{zone:"sport_basketball_content", keyValues:{sport:"basketball"}}
                    },
                    {
                        uri:"/other_sports/cycling/",
                        data:{zone:"sport_cycling_content", keyValues:{sport:"cycling"}}
                    },
                    {
                        uri:"/other_sports/rowing/",
                        data:{zone:"sport_rowing_content", keyValues:{sport:"rowing"}}
                    },
                    {
                        uri:"/other_sports/triathlon/",
                        data:{zone:"sport_triathlon_content", keyValues:{sport:"triathlon"}}
                    },
                    {
                        uri:"/olympics/",
                        data:{
                            zone:"sport_olympics_content",
                            keyValues:{
                                sport:"olympics"
                            }
                        },
                        zones:[
                            {
                                uri:"2012/",
                                data:{
                                    zone:"sport_london2012_content"
                                }
                            }
                        ]
                    },
                    {
                        uri:"/olympic_games",
                        data:{zone:"sport_olympics_content", keyValues:{sport:"olympics"}},
                        zones:[
                            {
                                uri:"/london_2012/",
                                data:{zone:"sport_london2012_content", keyValues:{}}
                            },
                            {
                                uri:"/world_olympic_dreams/",
                                data:{ads:false, zone:"sport_olympicdreams_content", keyValues:{}}
                            }
                        ]
                    },
                    {
                        uri:"/other_sports/sailing/",
                        data:{zone:"sport_sailing_content", keyValues:{sport:"sailing"}}
                    },
                    {
                        uri:"/golf/",
                        data:{zone:"sport_golf_content", keyValues:{sport:"golf"}, slots:{bottom:true} }
                    },
                    {
                        uri:"/northern_ireland/",
                        data:{zone:"sport_northernireland_content", keyValues:{sport:"northernireland"}}
                    },
                    {
                        uri:"/scotland/",
                        data:{zone:"sport_scotland_content", keyValues:{sport:"scotland"}}
                    },
                    {
                        uri:"/wales/",
                        data:{zone:"sport_wales_content", keyValues:{sport:"wales"}}
                    },
                    {
                        uri:"/volleyball/",
                        data:{zone:"sport_volleyball_content", keyValues:{sport:"volleyball"}}
                    },
                    {
                        uri:"/wrestling/",
                        data:{zone:"sport_wrestling_content", keyValues:{sport:"wrestling"}}
                    }
                ]
			},

            /*******************************************************************
             * BBC Earth
             ******************************************************************/

			{
				uri:"/timothyallen.blogs.bbcearth.com",
				data:{
                    ads:true,
                    site:"bbcearth.com",
                    zone:"blog_timothyallen",
                    slotSize:{
                        mpu:"300x250,300x600"
                    }
                }
			},
			{
				uri:"/humanplanet.blogs.bbcearth.com",
				data:{
                    ads:true,
                    site:"bbcearth.com",
                    zone:"blog_humanplanet",
                    slotSize:{
                        mpu:"300x250,300x600"
                    }
                }
			},

            /*******************************************************************
             * London 2012 Olympics
             ******************************************************************/

			{
				uri:"/london2012",
				data:{
                    ads:true,
                    zone:"sport_olympicportal_content",
                    keyValues:{
                        sport:"olympics"
                    },
                    slots:{
                        sponsor_section:false  // Also got a CSS hack ('london2012') to hide it when using the test_zone
                    }
                }
			},

            /*******************************************************************
             * Global iPlayer
             ******************************************************************/

			{
				uri:"/iplayer/radio",
				data:{
                    ads:true,
                    site:"bbccom.live.ipad.gip.marketing",
                    zone:"iplayer_radio_content"
                }
			},
			{
				uri:"/iplayer/tv",
				data:{
                    ads:true,
                    site:"bbccom.live.ipad.gip.marketing",
                    zone:"iplayer_tv_content"
                }
			}
		]
	},
	process:function(zoneData, domain, path, referrer) {
        // If it ends in a forward slash OR default.stm
        if( path.match( /\/$|\/default.stm$/ ) ){
            if(zoneData.keyValues.ctype){
                zoneData.keyValues.ctype = "index";
            }
            if(zoneData.zone){
                zoneData.zone = zoneData.zone.replace(/content$/,"index");
            }
        }

        // Referrer KeyValue
        if (referrer == "") {
            // Non-bbc
            zoneData.keyValues.referrer = "nonbbc";
        } else if((matchArr = referrer.match(/^(http[s]?:\/\/[a-z0-9\.]*bbc\.(co\.uk|com))(.*)$/)) && zoneData.keyValues) {
            // Within bbc website
            var refString;
            refString = matchArr[3].replace(/default.stm$|\-|\/|_/g,"");
            if(refString.length > 0 && refString.length <= 64) {
                zoneData.keyValues.referrer = escape(refString);
            } else {
                zoneData.keyValues.referrer = "";
            }
        } else {
            // Catch exceptions
            zoneData.keyValues.referrer = "nonbbc";
        }

        // Add domain of request (www.bbc.com/www.bbc.co.uk/news.bbc.co.uk) BBCCOM-1142
        zoneData.keyValues.domain = domain;

        // Referrer_Domain KeyValue
        var refDomain;
        if ((refDomain = referrer.match(/^(http[s]?:\/\/)([a-z0-9\.]*)((?:\/(?:\w|-|\+|\.)+)*)(\/.*)$/))) {
            zoneData.keyValues.referrer_domain = refDomain[2];
        } else {
            zoneData.keyValues.referrer_domain = "";
        }

        // Retrieve meta data for this zone
        if ((zoneData.meta) && (meta_data = BBC.adverts.getMetaData(zoneData.meta))) {
            for(var key in meta_data) zoneData.keyValues[key] = meta_data[key];
        }

        // Behavioral targeting adserver integration
        var rsi_segs = [];
        var segs_beg=document.cookie.indexOf('rsi_segs=');
        if(segs_beg>=0){
            segs_beg=document.cookie.indexOf('=',segs_beg)+1;
            if(segs_beg>0){
                var segs_end=document.cookie.indexOf(';',segs_beg);
                if(segs_end==-1)segs_end=document.cookie.length;
                rsi_segs=document.cookie.substring(segs_beg,segs_end).split('|');
            }
        }
        var segQS = rsi_segs.length> 0 ? "rsi=" + rsi_segs[0] +";" :"";
        for (var i = 1; i <rsi_segs.length && i <20; i++)
            segQS += ("rsi" + "=" + rsi_segs[i] + ";");
        zoneData.keyValues.rsi = segQS.substring(4,segQS.length-1);

        //event sponsorhip  keyvalue
        if(document.getElementsByName('Slug').length != 0){
            zoneData.keyValues.slug = escape(document.getElementsByName('Slug')[0].getAttribute('content').toLowerCase());
        }

        // Headline keyValue
        if(document.getElementsByName('Headline').length != 0){
            var headline = document.getElementsByName('Headline')[0].getAttribute('content').toLowerCase();
            headline = headline.split(' ').join('');
            if (headline.indexOf(':') == -1) {
                zoneData.keyValues.headline = encodeURIComponent(headline);
            } else {
                zoneData.keyValues.headline = encodeURIComponent(headline.substr(0,headline.indexOf(':')));
            }
        }

        // Weather location keyValues
        if (typeof(bbccom_weather) !== "undefined") {
            for(var weatherKey in bbccom_weather) {
                zoneData.keyValues[weatherKey] = escape(bbccom_weather[weatherKey].toLowerCase().replace(/[^a-zA-Z 0-9]/g,''));
            }
        }
        return zoneData;
	}
});