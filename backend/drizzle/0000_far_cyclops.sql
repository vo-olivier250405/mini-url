CREATE TABLE `urls_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`shortId` text NOT NULL,
	`longUrl` text NOT NULL,
	`shortUrl` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `urls_table_shortId_unique` ON `urls_table` (`shortId`);