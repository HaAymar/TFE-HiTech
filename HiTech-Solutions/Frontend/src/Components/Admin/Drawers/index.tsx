import "./style.css";

import {
	CDBSidebar,
	CDBSidebarContent,
	CDBSidebarFooter,
	CDBSidebarHeader,
	CDBSidebarMenu,
	CDBSidebarMenuItem,
} from "cdbreact";
import React, { startTransition, Suspense, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import profile from "../../../Assets/Student/profile.jpg";
import NavBarDrawer from "../../Navbar/NavBarDrawer/index";
import { collectTestState } from "../../Stores/collecTestId";
import { fetchFormations } from "../../Stores/formationsState";
import { userNameState } from "../../Stores/nameUser";
import { userRoleState } from "../../Stores/roleUser";

interface DashboardSidebarProps {
	role: "admin" | "teacher";
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ role }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const initials = queryParams.get("initials");

	const navigateWithQuery = (path: string) => {
		startTransition(() => {
			navigate(`${path}?initials=${initials}`);
		});
	};
	const defaultStyle: React.CSSProperties = {
		backgroundColor: "#245b70e6",

		marginLeft: "auto",
		borderBottomLeftRadius: "15px",
		width: "100%",
		maxWidth: "calc(100% - 180pt)",
		position: "fixed",
	};

	const [isServicesOpen, setIsServicesOpen] = useState(false);
	const [isManTestOpen, setIsManTestOpen] = useState(false);
	const [displayFormation, setDisplayFormation] = useState(false);
	const [, setDisplayTest] = useState(false);
	const [, setDisplayTroubleshooting] = useState(false);

	const setCollectId = useSetRecoilState(collectTestState);
	const name = useRecoilValue(userNameState);
	const roleUser = useRecoilValue(userRoleState);
	const formations = useRecoilValue(fetchFormations);
	console.log(roleUser);
	const toogleFormation = () => {
		console.log("Salut", displayFormation);
		startTransition(() => {
			setDisplayFormation(true);
			setDisplayTroubleshooting(false);
			setDisplayTest(false);
			navigateWithQuery("/drawer/formations");
		});
	};
	const toogleTest = (id: number) => {
		setCollectId(id);
		console.log("collectId", id);
		startTransition(() => {
			setDisplayFormation(false);
			setDisplayTroubleshooting(false);
			setDisplayTest(true);
			navigateWithQuery("/drawer/teacher");
		});
	};

	const toogleTroubleshooting = () => {
		console.log("hehe", displayFormation);
		startTransition(() => {
			setDisplayFormation(false);
			setDisplayTroubleshooting(true);
			setDisplayTest(false);
			navigateWithQuery("/drawer/members");
		});
	};

	const toggleServices = () => {
		startTransition(() => {
			setIsServicesOpen(!isServicesOpen);
		});
	};

	const toggleManTest = () => {
		setIsManTestOpen(!isManTestOpen);
	};

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
														onClick={
															toogleTroubleshooting
														}
													>
														{" "}
														<CDBSidebarMenuItem
															icon="user"
															className="hoverColor"
														>
															<Link to="/drawer/members">
																Members
															</Link>
														</CDBSidebarMenuItem>
													</div>
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
																	<Link
																		style={{
																			color: "rgb(158, 156, 156)",
																		}}
																		to="/drawer/formations"
																	>
																		Formations
																	</Link>
																</CDBSidebarMenuItem>
															</div>
															<div>
																<CDBSidebarMenuItem className="hoverColor1">
																	Dépannages
																</CDBSidebarMenuItem>
															</div>
														</div>
													)}
												</div>
												<div
													onClick={() =>
														window.open(
															"https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=150&ct=1713986804&rver=7.0.6738.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fcobrandid%3dab0455a0-8d03-46b9-b18b-df2f57b9e44c%26nlp%3d1%26deeplink%3dowa%252f%26RpsCsrfState%3d9d65f425-e27f-310f-6a3d-c80ebe86c2aa&id=292841&aadredir=1&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=ab0455a0-8d03-46b9-b18b-df2f57b9e44c",
															"_blank"
														)
													}
												>
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
												<div>
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
															className="sub-menu servicesProf"
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
																			<Link
																				to={`/drawer/teacher`}
																				style={{
																					color: "rgb(158, 156, 156)",
																				}}
																			>
																				{
																					formation.name
																				}
																			</Link>
																		</CDBSidebarMenuItem>
																	</div>
																)
															)}
														</div>
													)}
													<div
														onClick={() =>
															window.open(
																"https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=150&ct=1713986804&rver=7.0.6738.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fcobrandid%3dab0455a0-8d03-46b9-b18b-df2f57b9e44c%26nlp%3d1%26deeplink%3dowa%252f%26RpsCsrfState%3d9d65f425-e27f-310f-6a3d-c80ebe86c2aa&id=292841&aadredir=1&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=ab0455a0-8d03-46b9-b18b-df2f57b9e44c",
																"_blank"
															)
														}
													>
														<CDBSidebarMenuItem
															icon="envelope"
															className="hoverColor"
														>
															Emails
														</CDBSidebarMenuItem>
													</div>
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
									{/* HiTech-Solutions */}
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											margin: "2%",
										}}
									>
										<img
											src={profile}
											alt="User profile"
											style={{
												width: "50px",
												height: "40px",
												borderRadius: "50%",
												flexDirection: "column",
											}}
										/>
										<div
											style={{
												marginLeft: "10px",
												display: "flex",
												alignItems: "center",
												flexDirection: "column",
												color: "#292828e7",
											}}
										>
											<strong>{name}</strong>
											<div
												style={{
													fontSize: "smaller",
													color: "#40b9af",
												}}
											>
												<strong>{roleUser}</strong>
											</div>
										</div>
									</div>
								</CDBSidebarFooter>
							</div>
						</CDBSidebar>
					</div>
				</Col>

				<Suspense fallback={<div>Loading...</div>}>
					<Outlet />
				</Suspense>
			</Row>
		</div>
	);
};

export default DashboardSidebar;
