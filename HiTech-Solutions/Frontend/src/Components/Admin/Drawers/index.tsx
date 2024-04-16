import "./style.css";

import {
	CDBSidebar,
	CDBSidebarContent,
	CDBSidebarFooter,
	CDBSidebarHeader,
	CDBSidebarMenu,
	CDBSidebarMenuItem,
} from "cdbreact";
import React, { startTransition, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useRecoilValue } from "recoil";

import NavBarDrawer from "../../Navbar/NavBarDrawer/index";
import { fetchFormations } from "../../Stores/formationsState";
import FormulaireTest from "../../Teacher/index";
import Admin from "../CreateTrainings/index";
import CreatingTroubleshooting from "../CreateTroubleshootings";

interface DashboardSidebarProps {
	role: "admin" | "teacher";
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ role }) => {
	const defaultStyle: React.CSSProperties = {
		backgroundColor: "#245b70e6",
		paddingRight: "20px",
		marginLeft: "auto",
		borderBottomLeftRadius: "15px",
		width: "100%",
		maxWidth: "calc(100% - 17%)",
	};
	const [isMembersOpen, setIsMembersOpen] = useState(false);
	const [isServicesOpen, setIsServicesOpen] = useState(false);
	const [isManTestOpen, setIsManTestOpen] = useState(false);
	const [displayFormation, setDisplayFormation] = useState(false);
	const [displayTest, setDisplayTest] = useState(false);
	const [displayTroubleshooting, setDisplayTroubleshooting] = useState(false);

	const [collectId, setCollectId] = useState<number>(0);

	const formations = useRecoilValue(fetchFormations);

	const toogleFormation = () => {
		console.log("Salut", displayFormation);
		startTransition(() => {
			setDisplayFormation(true);
			setDisplayTroubleshooting(false);
			setDisplayTest(false);
		});
	};
	const toogleTest = (id: number) => {
		setCollectId(id);

		startTransition(() => {
			setDisplayFormation(false);
			setDisplayTroubleshooting(false);
			setDisplayTest(true);
		});
	};

	const toogleTroubleshooting = () => {
		console.log("hehe", displayFormation);
		startTransition(() => {
			setDisplayFormation(false);
			setDisplayTroubleshooting(true);
			setDisplayTest(false);
		});
	};

	const toggleMembers = () => {
		setIsMembersOpen(!isMembersOpen);
	};

	const toggleServices = () => {
		setIsServicesOpen(!isServicesOpen);
	};

	const toggleManTest = () => {
		setIsManTestOpen(!isManTestOpen);
	};

	useEffect(() => {
		console.log("HEY", collectId);
	}, [collectId]);

	return (
		<div style={{ overflow: "hidden" }}>
			<NavBarDrawer customStyle={defaultStyle} />

			<Row>
				<Col xs={12} md={2}>
					<div
						style={{
							height: "100vh",
							overflow: "hidden",
							position: "fixed",
							maxWidth: "35vh",
						}}
					>
						<CDBSidebar
							textColor="#fff"
							backgroundColor=" #245b70e6"
							className={""}
							breakpoint={0}
							toggled={false}
							minWidth={""}
							maxWidth={""}
						>
							<div
								style={{
									color: "#40b9af",
								}}
							>
								<CDBSidebarHeader>
									Dashboard HiTech
								</CDBSidebarHeader>
							</div>

							<CDBSidebarContent className="sidebar-content">
								<CDBSidebarMenu>
									<div
										style={{
											overflow: "auto",
											maxWidth: "600px",
										}}
									>
										{role === "admin" && (
											<>
												<div className="members">
													<div
														onClick={toggleMembers}
													>
														<CDBSidebarMenuItem
															icon="user"
															className="hoverColor"
														>
															Members{" "}
															<span className="arrow">
																{isMembersOpen ? (
																	<RiArrowDropDownLine />
																) : (
																	<RiArrowDropUpLine />
																)}
															</span>
														</CDBSidebarMenuItem>
													</div>

													{isMembersOpen && (
														<div
															className="sub-menu"
															style={{
																display: "flex",
																flexDirection:
																	"column",
																paddingLeft:
																	"30px",
															}}
														>
															<CDBSidebarMenuItem className="hoverColor1">
																Professeurs
															</CDBSidebarMenuItem>
															<CDBSidebarMenuItem className="hoverColor1">
																Etudiants
															</CDBSidebarMenuItem>
														</div>
													)}
												</div>
												<div className="services">
													<div
														onClick={toggleServices}
													>
														<CDBSidebarMenuItem
															icon="cogs"
															className="hoverColor"
														>
															Services{" "}
															<span className="arrow">
																{isServicesOpen ? (
																	<RiArrowDropDownLine />
																) : (
																	<RiArrowDropUpLine />
																)}
															</span>
														</CDBSidebarMenuItem>
													</div>

													{isServicesOpen && (
														<div
															className="sub-menu"
															style={{
																display: "flex",
																flexDirection:
																	"column",
																paddingLeft:
																	"30px",
															}}
														>
															<div
																onClick={
																	toogleFormation
																}
															>
																<CDBSidebarMenuItem className="hoverColor1">
																	Formations
																</CDBSidebarMenuItem>
															</div>
															<div
																onClick={
																	toogleTroubleshooting
																}
															>
																<CDBSidebarMenuItem className="hoverColor1">
																	Dépannages
																</CDBSidebarMenuItem>
															</div>
														</div>
													)}
												</div>

												<CDBSidebarMenuItem
													icon="envelope"
													className="hoverColor"
												>
													Messages
												</CDBSidebarMenuItem>
											</>
										)}
									</div>
									<div
										style={{
											overflow: "auto",
											maxHeight: "450px",
											scrollbarWidth: "thin",
											scrollbarColor: "#888 #314353",
										}}
									>
										{role === "teacher" && (
											<>
												<div className="members">
													<div>
														<CDBSidebarMenuItem
															icon="user"
															className="hoverColor"
														>
															Students{" "}
														</CDBSidebarMenuItem>
													</div>
												</div>
												<div className="services">
													<div
														onClick={toggleManTest}
													>
														<CDBSidebarMenuItem
															icon="cogs"
															className="hoverColor"
														>
															Formations{" "}
															<span className="arrow">
																{isManTestOpen ? (
																	<RiArrowDropDownLine />
																) : (
																	<RiArrowDropUpLine />
																)}
															</span>
														</CDBSidebarMenuItem>
													</div>

													{isManTestOpen && (
														<div
															className="sub-menu"
															style={{
																display: "flex",
																flexDirection:
																	"column",
																paddingLeft:
																	"30px",
															}}
														>
															{formations.map(
																(formation) => (
																	<div
																		onClick={() =>
																			toogleTest(
																				formation.id
																			)
																		}
																	>
																		<CDBSidebarMenuItem className="hoverColor1">
																			{
																				formation.name
																			}
																		</CDBSidebarMenuItem>
																	</div>
																)
															)}
														</div>
													)}
													<CDBSidebarMenuItem
														icon="envelope"
														className="hoverColor"
													>
														Emails
													</CDBSidebarMenuItem>
												</div>
											</>
										)}
									</div>
								</CDBSidebarMenu>
							</CDBSidebarContent>
							<div
								style={{
									textAlign: "center",
									paddingBottom: "25px",
								}}
							>
								<CDBSidebarFooter className="drawerFooter">
									HiTech-Solutions
								</CDBSidebarFooter>
							</div>
						</CDBSidebar>
					</div>
				</Col>
				{displayFormation && <Admin />}
				{displayTest && <FormulaireTest idFormation={collectId} />}
				{displayTroubleshooting && <CreatingTroubleshooting />}
			</Row>
		</div>
	);
};

export default DashboardSidebar;
