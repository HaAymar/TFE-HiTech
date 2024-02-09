import {
	CDBSidebar,
	CDBSidebarContent,
	CDBSidebarFooter,
	CDBSidebarHeader,
	CDBSidebarMenu,
	CDBSidebarMenuItem,
} from "cdbreact";
import React from "react";
import { Col, Row } from "react-bootstrap";

import NavBar from "../../Navbar/Navbar";
import Admin from "../CreateTrainings/index";

const DashboardSidebar = () => {
	return (
		<div style={{ overflow: "hidden" }}>
			<NavBar />
			<Row>
				<Col xs={12} md={2}>
					<div
						style={{
							height: "100vh",
							overflow: "hidden",
						}}
					>
						<CDBSidebar
							textColor="#fff"
							backgroundColor="#314353"
							className={""}
							breakpoint={0}
							toggled={false}
							minWidth={""}
							maxWidth={""}
						>
							<div
								style={{
									paddingTop: "60px",
								}}
							>
								<CDBSidebarHeader>Dashboard</CDBSidebarHeader>
							</div>

							<CDBSidebarContent className="sidebar-content">
								<CDBSidebarMenu>
									<CDBSidebarMenuItem icon="user">
										Members
									</CDBSidebarMenuItem>
									<CDBSidebarMenuItem icon="cogs">
										Services
									</CDBSidebarMenuItem>
									<CDBSidebarMenuItem icon="envelope">
										Messages
									</CDBSidebarMenuItem>
								</CDBSidebarMenu>
							</CDBSidebarContent>
							<div
								style={{
									textAlign: "center",
									paddingBottom: "25px",
								}}
							>
								<CDBSidebarFooter>
									HiTech-Solutions
								</CDBSidebarFooter>
							</div>
						</CDBSidebar>
					</div>
				</Col>
				<Col>
					<Admin />
				</Col>
			</Row>
		</div>
	);
};

export default DashboardSidebar;
