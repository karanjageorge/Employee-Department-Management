BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Departments] (
    [DepartmentID] NVARCHAR(1000) NOT NULL,
    [DepartmentName] NVARCHAR(1000) NOT NULL,
    [DepartmentLocation] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Departments_pkey] PRIMARY KEY CLUSTERED ([DepartmentID]),
    CONSTRAINT [Departments_DepartmentName_key] UNIQUE NONCLUSTERED ([DepartmentName])
);

-- CreateTable
CREATE TABLE [dbo].[Employee] (
    [id] NVARCHAR(1000) NOT NULL,
    [firstName] NVARCHAR(1000) NOT NULL,
    [lastName] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [salary] DECIMAL(32,16) NOT NULL,
    [departmentId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Employee_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Employee_email_key] UNIQUE NONCLUSTERED ([email])
);

-- AddForeignKey
ALTER TABLE [dbo].[Employee] ADD CONSTRAINT [Employee_departmentId_fkey] FOREIGN KEY ([departmentId]) REFERENCES [dbo].[Departments]([DepartmentID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
